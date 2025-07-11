import { Button } from "@/components/ui/button";
import { Info, Trash2, Edit2 } from "lucide-react";
import Link from "next/link";

type ActionsProps = {
  id: number;
  route: string;
};

export default function Actions(props: ActionsProps): React.ReactElement {
  const { id, route } = props;
  console.log("id", id);

  const ROUTE =
    route === "patients" ? `/dashboard/patients/` : `/dashboard/team/`;

  return (
    <div className="flex justify-end gap-2 min-w-[100px]">
      <Link href={`${ROUTE}${id}`}>
        <Button variant="outline" size="sm" className="hover:cursor-pointer">
          <Info className="h-4 w-4" />
        </Button>
      </Link>

      {route !== "team" && (
        <Link href={`${ROUTE}${id}/edit`}>
          <Button variant="outline" size="sm" className="hover:cursor-pointer">
            <Edit2 className="h-4 w-4" />
          </Button>
        </Link>
      )}
      <Button
        // variant="destructive"
        className="hover:cursor-pointer hover:bg-red-500"
        size="sm"
        onClick={() => {
          console.log("Delete patient", id);
        }}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
