"use client";

import React, { useEffect } from "react";
import updateRoom from "../actions/updateRoom";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

const EditRoomForm = ({ room, id }) => {
  const [state, formAction] = useFormState(updateRoom, {});
  const router = useRouter();

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.success) {
      toast.success("Room updated successfully");
      setTimeout(() => {
        router.push("/rooms/my");
      }, 2000);
    }
  }, [state]);

  let formArray = [
    {
      label: "Room Name",
      type: "text",
      name: "name",
      placeholder: "Enter a name (Large Conference Room)",
    },
    {
      label: "Description",
      type: "textarea",
      name: "description",
      placeholder: "Enter a description for the room",
    },
    {
      label: "Square Feet",
      type: "number",
      name: "sqft",
      placeholder: "Enter room size in ft",
    },
    {
      label: "Capacity",
      type: "number",
      name: "capacity",
      placeholder: "Number of people the room can hold",
    },
    {
      label: "Price Per Hour",
      type: "number",
      name: "price_per_hour",
      placeholder: "Enter price per hour",
    },
    {
      label: "Address",
      type: "text",
      name: "address",
      placeholder: "Enter full address",
    },
    {
      label: "Location",
      type: "text",
      name: "location",
      placeholder: "Location (Building, Floor, Room)",
    },
    {
      label: "Availability",
      type: "text",
      name: "availability",
      placeholder: "Availability (Monday - Friday, 9am - 5pm)",
    },
    {
      label: "Amenities",
      type: "text",
      name: "amenities",
      placeholder: "Amenities CSV (projector, whiteboard, etc.)",
    },
  ];

  formArray = formArray.map((item) => {
    if (room[item.name]) {
      return {
        ...item,
        ["defaultValue"]: room[item.name],
      };
    } else {
      return item;
    }
  });

  console.log("form state", state);
  return (
    <div className=" mx-auto bg-white shadow-lg rounded-lg p-8 mt-8">
      <form action={formAction}>
        <input className="hidden" defaultValue={id} name="room_id" />
        {formArray.map(({ label, type, name, placeholder, defaultValue }) => (
          <div className="mb-6" key={name}>
            <label
              htmlFor={name}
              className="block text-gray-700 font-semibold mb-2"
            >
              {label}
            </label>
            {type === "textarea" ? (
              <textarea
                id={name}
                defaultValue={defaultValue}
                name={name}
                className="border rounded-md w-full py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={placeholder}
                required
              ></textarea>
            ) : (
              <input
                type={type}
                id={name}
                name={name}
                defaultValue={defaultValue}
                className="border rounded-md w-full py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={placeholder}
                required
              />
            )}
          </div>
        ))}

        {/* Image Upload */}
        {/* <div className="mb-6">
          <label
            htmlFor="image"
            className="block text-gray-700 font-semibold mb-2"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            className="border rounded-md w-full py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div> */}

        <div className="flex flex-col">
          <button
            type="submit"
            className="bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 rounded-md hover:bg-gradient-to-l transition duration-300"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRoomForm;
