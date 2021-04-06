import { Response } from 'express'
import { db } from './config/firebase'

type Request = {
  params: { num: number }
}

// const calculate = async(num: number) => {
//   const x= await db.collection('fibonacci').doc("1").get()
//   return x.data();
// };


const getFibonacci = async (req: Request, res: Response) => {
  try {
    const { num } = req.params;
    let x = Number(num);
    let fib_number = await db.collection('fibonacci').doc(x.toString()).get();

    if(!fib_number.exists) {
      // const calculated = calculate(num);
      // return res.status(200).json(calculated)
      const allEntries = await db.collection('fibonacci').get();
      return res.status(200).json(allEntries.docs)
    }

    return res.status(200).json(
        fib_number.data()
    )

  } catch(error) {
    return res.status(500).json(error.message)
  }
};

export { getFibonacci }