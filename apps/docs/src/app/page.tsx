import PickerDocs from "@/components/PickerDocs";
import Link from "next/link";

const Page = () => {
  return (
    <div className="mx-auto w-max py-40">
      <div className="text-center mb-5">
        <h4 className="text-3xl font-medium">React Color Pick</h4>
        <p className="text-gray-600 mt-1">Canva styled customizable React Color Picker</p>
      </div>
      <PickerDocs />
      <div className="text-center mt-8">
        Made By <Link href="https://siamahnaf.com/" className="text-cyan-500">Siam Ahnaf</Link>
      </div>
    </div>
  );
};

export default Page;