import {Response} from "express";
import {db, admin} from './config/firebase'

/**
 * Optimal solution would be:
 * 1. Query firestore to get the largest fibonacci numbers computer so far [x-1], [x]
 * 2. When asked to find fibonacci number at nth position, if n has not already been calculated,
 * calculate all fibonacci numbers from [x+1] ... [n-1] and store them (with access time = null
 * 3. Return the fibonacci number calculated at place 'n'
 * This way, if the user tries to find a number at any position before 'n',
 * he an query it without having to calculate it all over again
 */

/**
 * Num = index of the fibonacci number (count starting from 1)
 */
const calculateFibonacci = (num: number) => {
  if(num == 1){
    return 1;
  } else if (num==2){
    return 1;
  }

  let numbers: number[] = new Array(num).fill(1);
  numbers[0] = 1;
  numbers[1] = 1;
  for(let i = 2; i<num; i++) {
    numbers[i] = numbers[i-1] + numbers[i-2]
  }
  return numbers[num-1]
};


type EntryType = {
  index: number
}

type Request = {
  body: EntryType,
}

const getFibonacci = async (req: Request, res: Response) => {
  const { index } = req.body;
  const FieldValue = admin.firestore.FieldValue;

  try {
    //if this number has already been calculated, retrieve it and update access time
    const fib_number = await db.collection('fibonacci').doc(index.toString()).get();
    let entryObject = {};
    if(fib_number.exists) {
      // @ts-ignore
      entryObject = {index: index, value: fib_number.data().value, access_time:FieldValue.serverTimestamp()}
    } else {
      //if this number has not already been calculated, calculate it
      entryObject = {
        index: index,
        value: calculateFibonacci(index),
        access_time: FieldValue.serverTimestamp()
      };
    }

    //update and store the access time
    await db.collection('fibonacci').doc(index.toString()).set(entryObject);

    res.status(200).send({
      status: 'success',
      message: 'entry added successfully',
      data: entryObject
    })
  } catch(error) {
    res.status(500).json(error.message)
  }
};

export {getFibonacci}