"use server";

import { createAdminClient } from "@/config/appwrite";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import checkAuth from "./checkAuth";

async function updateRoom(previousState, formData) {
  try {
    const { user } = await checkAuth();
    if (!user) {
      return {
        error: "You must be logged in to create a room",
      };
    }

    const updatedObj = {
      user_id: user.id,
      name: formData.get("name"),
      description: formData.get("description"),
      sqft: formData.get("sqft"),
      capacity: formData.get("capacity"),
      location: formData.get("location"),
      address: formData.get("address"),
      availability: formData.get("availability"),
      price_per_hour: formData.get("price_per_hour"),
      amenities: formData.get("amenities"),
      // image: imageID,
    };

    const { databases } = await createAdminClient();

    const room = await databases.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      formData.get("room_id"),
      updatedObj
    );

    // Revalidate the cache for this path
    revalidatePath("/", "layout");

    return {
      success: true,
      room,
    };
  } catch (error) {
    console.log("Failed to get room", error);
    redirect("/error");
  }
}

export default updateRoom;
