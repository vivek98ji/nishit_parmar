import dbConnect from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    await dbConnect();
    res.status(200).json({ status: 'success', message: 'MongoDB connected' });
  } catch (e) {
    res.status(500).json({ status: 'error', message: e.message });
  }
}