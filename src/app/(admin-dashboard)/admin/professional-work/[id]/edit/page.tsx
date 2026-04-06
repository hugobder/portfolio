import { notFound } from "next/navigation";
import { ProfessionalWorkForm } from "@/components/admin/professional-work-form";
import { getProfessionalWorkById } from "@/lib/data";

export const dynamic = "force-dynamic";

interface EditProfessionalWorkPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProfessionalWorkPage({
  params,
}: EditProfessionalWorkPageProps) {
  const { id } = await params;
  const work = await getProfessionalWorkById(parseInt(id));

  if (!work) {
    notFound();
  }

  return <ProfessionalWorkForm work={work} isEditing />;
}
