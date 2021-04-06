import {Response} from "express";
import { db } from './config/firebase'

type Fib = {
  index: number
}

type Request = {
  body: Fib,
  params: { entryId: string }
}

/**
 * Num = index of the fibonacci number (count starting from 1)
 */
const calculateFibonacci = (num: number) => {
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

const getFibonacci = async (req: Request, res: Response) => {
  const { index } = req.body;
  try {
    const entry = db.collection('fibonacci').doc()
    const entryObject = {
      id: index,
      value: calculateFibonacci(index)
    };

    await entry.set(entryObject)

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