"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Loader2,
  ArrowLeft,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  ImageIcon,
  Code2,
} from "lucide-react";
import type { ProfessionalWork, ProfessionalWorkPage } from "@/lib/db/schema";
import Link from "next/link";

interface ProfessionalWorkFormProps {
  work?: ProfessionalWork;
  isEditing?: boolean;
}

function emptyPage(): ProfessionalWorkPage {
  return { title: "", content: "", screenshots: [], codeSnippets: [] };
}

export function ProfessionalWorkForm({
  work,
  isEditing = false,
}: ProfessionalWorkFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: work?.title || "",
    slug: work?.slug || "",
    description: work?.description || "",
    company: work?.company || "",
    role: work?.role || "",
    imageUrl: work?.imageUrl || "",
    technologies: work?.technologies?.join(", ") || "",
    featured: work?.featured || false,
    status: work?.status || "draft",
    order: work?.order || 0,
  });
  const [pages, setPages] = useState<ProfessionalWorkPage[]>(
    work?.pages && work.pages.length > 0 ? work.pages : [emptyPage()]
  );

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({
      ...formData,
      title,
      slug: !isEditing ? generateSlug(title) : formData.slug,
    });
  };

  const updatePage = (index: number, updates: Partial<ProfessionalWorkPage>) => {
    setPages((prev) =>
      prev.map((p, i) => (i === index ? { ...p, ...updates } : p))
    );
  };

  const addPage = () => setPages((prev) => [...prev, emptyPage()]);

  const removePage = (index: number) => {
    if (pages.length <= 1) return;
    setPages((prev) => prev.filter((_, i) => i !== index));
  };

  const movePage = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= pages.length) return;
    setPages((prev) => {
      const updated = [...prev];
      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
      return updated;
    });
  };

  const addScreenshot = (pageIndex: number) => {
    updatePage(pageIndex, {
      screenshots: [
        ...(pages[pageIndex].screenshots || []),
        { url: "", caption: "" },
      ],
    });
  };

  const removeScreenshot = (pageIndex: number, screenshotIndex: number) => {
    updatePage(pageIndex, {
      screenshots: (pages[pageIndex].screenshots || []).filter(
        (_, i) => i !== screenshotIndex
      ),
    });
  };

  const updateScreenshot = (
    pageIndex: number,
    screenshotIndex: number,
    field: "url" | "caption",
    value: string
  ) => {
    updatePage(pageIndex, {
      screenshots: (pages[pageIndex].screenshots || []).map((s, i) =>
        i === screenshotIndex ? { ...s, [field]: value } : s
      ),
    });
  };

  const addSnippet = (pageIndex: number) => {
    updatePage(pageIndex, {
      codeSnippets: [
        ...(pages[pageIndex].codeSnippets || []),
        { title: "", language: "", code: "" },
      ],
    });
  };

  const removeSnippet = (pageIndex: number, snippetIndex: number) => {
    updatePage(pageIndex, {
      codeSnippets: (pages[pageIndex].codeSnippets || []).filter(
        (_, i) => i !== snippetIndex
      ),
    });
  };

  const updateSnippet = (
    pageIndex: number,
    snippetIndex: number,
    field: "title" | "language" | "code",
    value: string
  ) => {
    updatePage(pageIndex, {
      codeSnippets: (pages[pageIndex].codeSnippets || []).map((s, i) =>
        i === snippetIndex ? { ...s, [field]: value } : s
      ),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const technologiesArray = formData.technologies
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t);

      const payload = {
        ...formData,
        technologies: technologiesArray,
        pages,
      };

      const url = isEditing
        ? `/api/professional-works/${work?.id}`
        : "/api/professional-works";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(
          isEditing
            ? "Professional work updated successfully"
            : "Professional work created successfully"
        );
        router.push("/admin/professional-work");
        router.refresh();
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to save");
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button asChild variant="ghost" size="icon">
          <Link href="/admin/professional-work">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">
            {isEditing ? "Edit Professional Work" : "New Professional Work"}
          </h1>
          <p className="text-muted-foreground">
            {isEditing
              ? "Update your professional work details"
              : "Create a new professional work entry"}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Project title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  placeholder="project-slug"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    placeholder="Company name"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    placeholder="Your role (optional)"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Short Description</Label>
                <Textarea
                  id="description"
                  placeholder="A brief description of the project"
                  rows={3}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Cover Image URL</Label>
                <Input
                  id="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="technologies">Technologies</Label>
                <Input
                  id="technologies"
                  placeholder="React, TypeScript, Node.js (comma-separated)"
                  value={formData.technologies}
                  onChange={(e) =>
                    setFormData({ ...formData, technologies: e.target.value })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Pages</CardTitle>
                <Button type="button" variant="outline" size="sm" onClick={addPage}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Page
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {pages.map((page, pageIndex) => (
                <Card key={pageIndex} className="border-dashed">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-muted-foreground">
                        Page {pageIndex + 1}
                      </span>
                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => movePage(pageIndex, -1)}
                          disabled={pageIndex === 0}
                        >
                          <ChevronUp className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => movePage(pageIndex, 1)}
                          disabled={pageIndex === pages.length - 1}
                        >
                          <ChevronDown className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive hover:text-destructive"
                          onClick={() => removePage(pageIndex)}
                          disabled={pages.length <= 1}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Page Title</Label>
                      <Input
                        placeholder="e.g. Overview, Architecture, Results"
                        value={page.title}
                        onChange={(e) =>
                          updatePage(pageIndex, { title: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Content (Markdown)</Label>
                      <Textarea
                        placeholder="Describe this section in markdown..."
                        rows={6}
                        value={page.content || ""}
                        onChange={(e) =>
                          updatePage(pageIndex, { content: e.target.value })
                        }
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="flex items-center gap-1.5">
                          <ImageIcon className="h-3.5 w-3.5" />
                          Screenshots
                        </Label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => addScreenshot(pageIndex)}
                        >
                          <Plus className="h-3.5 w-3.5 mr-1" />
                          Add
                        </Button>
                      </div>
                      {(page.screenshots || []).map((screenshot, sIndex) => (
                        <div key={sIndex} className="flex gap-2">
                          <Input
                            placeholder="Image URL"
                            value={screenshot.url}
                            onChange={(e) =>
                              updateScreenshot(pageIndex, sIndex, "url", e.target.value)
                            }
                            className="flex-1"
                          />
                          <Input
                            placeholder="Caption (optional)"
                            value={screenshot.caption || ""}
                            onChange={(e) =>
                              updateScreenshot(pageIndex, sIndex, "caption", e.target.value)
                            }
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive shrink-0"
                            onClick={() => removeScreenshot(pageIndex, sIndex)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="flex items-center gap-1.5">
                          <Code2 className="h-3.5 w-3.5" />
                          Code Snippets
                        </Label>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => addSnippet(pageIndex)}
                        >
                          <Plus className="h-3.5 w-3.5 mr-1" />
                          Add
                        </Button>
                      </div>
                      {(page.codeSnippets || []).map((snippet, snIndex) => (
                        <div key={snIndex} className="space-y-2 p-3 border rounded-lg">
                          <div className="flex gap-2">
                            <Input
                              placeholder="Snippet title"
                              value={snippet.title}
                              onChange={(e) =>
                                updateSnippet(pageIndex, snIndex, "title", e.target.value)
                              }
                              className="flex-1"
                            />
                            <Input
                              placeholder="Language"
                              value={snippet.language}
                              onChange={(e) =>
                                updateSnippet(pageIndex, snIndex, "language", e.target.value)
                              }
                              className="w-32"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive shrink-0"
                              onClick={() => removeSnippet(pageIndex, snIndex)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                          <Textarea
                            placeholder="Paste code here..."
                            rows={5}
                            value={snippet.code}
                            onChange={(e) =>
                              updateSnippet(pageIndex, snIndex, "code", e.target.value)
                            }
                            className="font-mono text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="status">Published</Label>
                  <p className="text-sm text-muted-foreground">
                    Make this work visible
                  </p>
                </div>
                <Switch
                  id="status"
                  checked={formData.status === "published"}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      status: checked ? "published" : "draft",
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="featured">Featured</Label>
                  <p className="text-sm text-muted-foreground">
                    Mark as featured
                  </p>
                </div>
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, featured: checked })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : isEditing ? (
              "Update"
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
