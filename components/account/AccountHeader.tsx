// import { auth, currentUser } from "@clerk/nextjs";

export async function AccountHeader() {
//   const { userId } = auth();
//   const user = await currentUser();

  return (
    <header className="bg-[#f9f9f9] py-8 px-4">
      <div className="container mx-auto text-center">
        <img src="/placeholder.svg?height=50&width=50" alt="Diaflower Logo" className="mx-auto mb-4" />
        {/* {userId ? ( */}
          <>
            {/* <h1 className="text-2xl font-semibold mb-2">WELCOME {user?.firstName?.toUpperCase()}</h1> */}
            <h1 className="text-2xl font-semibold mb-2">WELCOME RAMI</h1>
            <p className="text-sm text-gray-600">Welcome to your account.</p>
            <p className="text-sm text-gray-600">You can manage your shopping experience at Diaflower Online Store.</p>
          </>
        {/* ) : ( */}
          {/* <h1 className="text-2xl font-semibold mb-2">Welcome to Cartier</h1> */}
        {/* )} */}
      </div>
    </header>
  );
}