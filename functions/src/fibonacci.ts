import {Response} from "express";
import {db} from './config/firebase'


/**
 * Num = index of the fibonacci number (count starting from 1)
 */
const calculateFibonacci = async (num: number) => {
  if(num == 1){
    return 0;
  } else if (num==2){
    return 1;
  }

  const numbers: number[] = new Array(num);
  numbers[0] = 0;
  numbers[1] = 1;
  for(let i = 2; i<numbers.length; i++) {
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

  try {
    //if this number has already been calculated, retrieve it and return
    const fib_number = await db.collection('fibonacci').where('id', '==', index).get();
    let entryObject = {};
    if(!fib_number.empty) {
      // @ts-ignore
      //desgined in a way that each id only appears once, so can safely take the 0 index element
      entryObject = {value: fib_number[0].data().value, access_time=Date.now()}
    } else {
      //if this number has not already been calculated, calculate it
      entryObject = {
        value: calculateFibonacci(index),
        access_time: Date.now()
      };
    }

    //update and store the access time
    await db.collection('fibonacci').doc().set(entryObject);

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