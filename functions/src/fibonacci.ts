import { Response } from 'express'
import { db } from './config/firebase'

type Request = {
  params: { num: number }
}

// const calculate = async(num: number) => {
//
// }


const getFibonacci = async (req: Request, res: Response) => {
  try {
    const { num } = req.params;
    let x = Number(num);
    const fib_number = await db.collection('fibonacci').doc(x.toString()).get();

    return res.status(200).json(
        fib_number.data()
    )
  } catch(error) {
    return res.status(500).json(error.message)
  }
};

export { getFibonacci }