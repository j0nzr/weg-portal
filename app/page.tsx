//import Image from "next/image";
import Link from "next/link";
import { FaFolderOpen } from "react-icons/fa6";
import { RiNumbersFill } from "react-icons/ri";
import { IoTicket } from "react-icons/io5";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <img
          src="/logo.png"
          alt="Logo"
          className="mx-auto mb-6 w-48"
        />
        <div className="flex space-x-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-40">
            <FaFolderOpen className="text-4xl text-blue-500 mx-auto mb-3" />
            <p className="text-sm text-gray-600">Dokumente</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-40">
            <RiNumbersFill className="text-4xl text-blue-500 mx-auto mb-3" />
            <p className="text-sm text-gray-600">Finanzen</p>
          </div>
          <Link href="/tickets">
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-40">
            <IoTicket className="text-4xl text-blue-500 mx-auto mb-3" />
            <p className="text-sm text-gray-600">Ticket anlegen</p>
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
