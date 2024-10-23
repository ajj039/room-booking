import Heading from "@/app/components/Heading";
import EditRoomForm from "@/app/components/EditRoomForm";
import getSingleRoom from "@/app/actions/getSingleRoom";

const EditRoomPage = async ({ params }) => {
  const { id } = params;

  const room = await getSingleRoom(id);
  console.log("jaydeep-----", room);
  return (
    <>
      <Heading title="Edit Room" />
      <EditRoomForm room={room} id={id} />
    </>
  );
};

export default EditRoomPage;
