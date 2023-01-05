import { getAllReview } from "@/lib/db-admin";

export default async function handler(req, res) {
  const siteId = req.query.siteId;
  const { reviews, error } = await getAllReview(siteId);

  if (error) {
    res.status(500).json({ error });
  }

  res.status(200).json({ reviews });
}
