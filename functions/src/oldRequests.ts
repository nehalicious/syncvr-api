import {Response} from "express";
import { db } from './config/firebase'

const getAllRequests = async(req: Request, res: Response) => {
   try {
    const numbers: any[] = [];
    const querySnapshot = await db.collection('fibonacci').get()
    querySnapshot.forEach((doc: any) => numbers.push(doc.data()))
    return res.status(200).json(numbers)
  } catch(error) { return res.status(500).json(error.message) }
};

export {getAllRequests}