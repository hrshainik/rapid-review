import { dbAdmin } from "@/lib/firebase-admin";
import { parseISO, compareDesc } from "date-fns";

export async function getAllReview(siteId) {
  try {
    const snapshot = await dbAdmin
      .collection("review")
      .where("siteId", "==", siteId)
      .get();

    const reviews = [];

    snapshot.forEach((doc) => {
      reviews.push({ id: doc.id, ...doc.data() });
    });

    reviews.sort((a, b) => {
      return compareDesc(parseISO(a.createdAt), parseISO(b.createdAt));
    });

    return { reviews };
  } catch (error) {
    return { error };
  }
}

export async function getAllSite() {
  try {
    const snapshot = await dbAdmin.collection("sites").get();

    const sites = [];

    snapshot.forEach((doc) => {
      sites.push({ id: doc.id, ...doc.data() });
    });
    return { sites };
  } catch (error) {
    return { error };
  }
}

export async function getUserSites(userId) {
  try {
    const snapshot = await dbAdmin
      .collection("sites")
      .where("authorId", "==", userId)
      .get();

    const sites = [];

    snapshot.forEach((doc) => {
      sites.push({ id: doc.id, ...doc.data() });
    });
    return { sites };
  } catch (error) {
    return { error };
  }
}
