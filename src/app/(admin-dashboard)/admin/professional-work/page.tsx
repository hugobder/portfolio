"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { PlusCircle, MoreHorizontal, Pencil, Trash2, Loader2 } from "lucide-react";
import type { ProfessionalWork } from "@/lib/db/schema";

export default function AdminProfessionalWorkPage() {
  const [works, setWorks] = useState<ProfessionalWork[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWorks = async () => {
    try {
      const response = await fetch("/api/professional-works");
      const data = await response.json();
      setWorks(data);
    } catch {
      toast.error("Failed to load professional works");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorks();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this professional work?")) return;

    try {
      const response = await fetch(`/api/professional-works/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Professional work deleted successfully");
        fetchWorks();
      } else {
        toast.error("Failed to delete professional work");
      }
    } catch {
      toast.error("An error occurred");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Réalisations</h1>
          <p className="text-muted-foreground">
            Manage your professional work
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/professional-work/new">
            <PlusCircle className="h-4 w-4 mr-2" />
            New Work
          </Link>
        </Button>
      </div>

      {works.length > 0 ? (
        <div className="grid gap-4">
          {works.map((work) => (
            <Card key={work.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      {work.title}
                      {work.featured && (
                        <Badge variant="secondary">Featured</Badge>
                      )}
                    </CardTitle>
                    <CardDescription>
                      {work.company}{work.role ? ` · ${work.role}` : ""} — {work.description}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/professional-work/${work.id}/edit`}>
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(work.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {work.technologies?.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                    {(work.technologies?.length || 0) > 4 && (
                      <Badge variant="outline">
                        +{(work.technologies?.length || 0) - 4}
                      </Badge>
                    )}
                  </div>
                  <Badge
                    variant={work.status === "published" ? "default" : "secondary"}
                  >
                    {work.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground mb-4">No professional work yet</p>
            <Button asChild>
              <Link href="/admin/professional-work/new">
                <PlusCircle className="h-4 w-4 mr-2" />
                Create your first professional work
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
