import Heading from "@/app/components/Heading";
import getMyRooms from "@/app/actions/getMyRooms";
import MyRoomCard from "@/app/components/MyRoomCard";

const MyRoomsPage = async () => {
  const rooms = await getMyRooms();
  return (
    <>
      <Heading title={"My Rooms"} />
      {rooms.length > 0 ? (
        rooms.map((room) => <MyRoomCard room={room} key={room.$id} />)
      ) : (
        <p>You have no rooms found</p>
      )}
    </>
  );
};

export default MyRoomsPage;
