import { getUserSites } from "@/lib/db-admin";
import { authAdmin } from "@/lib/firebase-admin";

export default async function handler(req, res) {
  const token = req.headers.token;
  const { uid } = await authAdmin.verifyIdToken(token);
  const { sites, error } = await getUserSites(uid);

  if (error) {
    res.status(500).json({ error });
  }

  res.status(200).json({ sites });
}
