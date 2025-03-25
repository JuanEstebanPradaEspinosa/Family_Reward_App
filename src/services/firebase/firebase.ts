import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./index";
import { ChildInfo, ChoreInfo } from "../../types/interfaces";
import { auth } from "./index";

export const FirebaseService = {
  // Check if user is authenticated before writing to the database
  checkAuthBeforeWrite() {
    const user = auth.currentUser;
    if (!user || user.isAnonymous) {
      throw new Error("Unauthorized: Only registered users can modify data");
    }
  },

  async getAllChildren(): Promise<ChildInfo[]> {
    try {
      const snapshot = await getDocs(collection(db, "children"));
      const children = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const choresSnapshot = await getDocs(
            collection(db, "children", doc.id, "chores"),
          );
          const chores = choresSnapshot.docs.map(
            (choreDoc) =>
              ({
                id: choreDoc.id,
                ...choreDoc.data(),
              }) as ChoreInfo,
          );
          return {
            id: doc.id,
            ...doc.data(),
            chores,
          } as ChildInfo;
        }),
      );
      return children;
    } catch (error) {
      console.error("Error fetching children:", error);
      throw error;
    }
  },

  async addChild(child: Omit<ChildInfo, "id" | "chores">): Promise<string> {
    try {
      this.checkAuthBeforeWrite();
      const docRef = await addDoc(collection(db, "children"), {
        ...child,
        totalRewardsPoints: 0,
      });
      return String(docRef.id);
    } catch (error: any) {
      console.error("Error adding child:", error);
      throw new Error(error.message || "Failed to add child");
    }
  },

  async removeChild(childId: string): Promise<void> {
    try {
      this.checkAuthBeforeWrite();
      // Delete all chores in subcollection first
      const childDocRef = doc(db, "children", String(childId));
      const choresSnapshot = await getDocs(
        collection(db, "children", String(childId), "chores"),
      );
      await Promise.all(
        choresSnapshot.docs.map((choreDoc) =>
          deleteDoc(
            doc(db, "children", String(childId), "chores", choreDoc.id),
          ),
        ),
      );
      // Then delete the child document
      await deleteDoc(childDocRef);
    } catch (error: any) {
      console.error("Error removing child:", error);
      throw new Error(error.message || "Failed to remove child");
    }
  },

  async getChores(childId: string): Promise<ChoreInfo[]> {
    try {
      const choresRef = collection(db, "children", childId, "chores");
      const snapshot = await getDocs(choresRef);
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ChoreInfo[];
    } catch (error) {
      console.error("Error getting chores:", error);
      throw error;
    }
  },

  async addChore(
    childId: string,
    chore: Omit<ChoreInfo, "id">,
  ): Promise<string> {
    try {
      this.checkAuthBeforeWrite();
      const choreRef = await addDoc(
        collection(db, "children", String(childId), "chores"),
        {
          ...chore,
          status: "pending",
        },
      );
      return choreRef.id;
    } catch (error: any) {
      console.error("Error removing chore:", error);
      throw new Error(error.message || "Failed to remove chore");
    }
  },

  async removeChore(childId: string, choreId: string): Promise<void> {
    try {
      this.checkAuthBeforeWrite();
      const choreRef = doc(db, "children", String(childId), "chores", choreId);
      await deleteDoc(choreRef);
    } catch (error: any) {
      console.error("Error removing chore:", error);
      throw new Error(error.message || "Failed to remove chore");
    }
  },

  async toggleChoreStatus(childId: string, choreId: string): Promise<void> {
    try {
      this.checkAuthBeforeWrite();
      const choreRef = doc(db, "children", childId, "chores", choreId);
      const choreDoc = await getDoc(choreRef);

      if (!choreDoc.exists()) {
        throw new Error("Chore not found");
      }

      const choreData = choreDoc.data();
      const currentStatus = choreData.status;
      const newStatus = currentStatus === "pending" ? "completed" : "pending";
      const points = choreData.rewardPoints || 0;

      // Update chore status
      await updateDoc(choreRef, { status: newStatus });

      // Update child's total points
      const childRef = doc(db, "children", childId);
      const childDoc = await getDoc(childRef);

      if (childDoc.exists()) {
        const currentPoints = childDoc.data().totalRewardsPoints || 0;
        const newPoints =
          newStatus === "completed"
            ? currentPoints + points
            : currentPoints - points;

        await updateDoc(childRef, {
          totalRewardsPoints: Math.max(0, newPoints),
        });
      }
    } catch (error: any) {
      console.error("Error toggling chore status:", error);
      throw new Error(error.message || "Failed to toggle chore status");
    }
  },
};
