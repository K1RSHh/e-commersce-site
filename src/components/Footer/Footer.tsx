function Footer() {
  return (
    <div className="mx-auto">
      <div className="flex gap-5 h-75 items-center">
        <div className="flex flex-col w-75 text-start">
          <p className="font-bold text-3xl mb-3">Welcome</p>
          <p>
            Aenean suscipit tincidunt purus ut facilisis. Donec aliquam eleifend
            libero, et dictum sem sodales quis. Vivamus vestibulum libero velit
          </p>
        </div>
        <div className="flex flex-col w-75 text-start">
          <p className="font-bold text-3xl mb-3">Useful Links</p>
          <ul className="list-disc px-9">
            <li className="cursor-pointer">FAQ</li>
            <li className="cursor-pointer hover:underline">Blogs</li>
            <li className="cursor-pointer hover:underline">Privacy Policy</li>
            <li className="cursor-pointer hover:underline">Terms</li>
          </ul>
        </div>
        <div className="flex flex-col w-75 text-start">
          <p className="font-bold text-3xl mb-3">End Points</p>
          <ul className="list-disc px-9">
            <li className="cursor-pointer hover:underline">Login</li>
            <li className="cursor-pointer hover:underline">Logout</li>
            <li className="cursor-pointer hover:underline">Registration</li>
            <li className="cursor-pointer hover:underline">Check</li>
          </ul>
        </div>
        <div className="flex flex-col w-75 text-start">
          <p className="font-bold text-3xl mb-3">Contact Us</p>
          <p>
            Wheeling, West Virginia, 26003 Contact: 304-559-3023 E-mail:
            shopnow@store.com contact@ama.com
          </p>
        </div>
      </div>
      <p className="my-6">© 2025 All rights reserved. Powered by Vayu</p>
    </div>
  );
}

export default Footer;
