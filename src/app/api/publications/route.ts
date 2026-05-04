import { NextResponse } from "next/server";

import { getCurrentPublicationProfile } from "@/features/publications/lib/ensurePublicationProfile";
import { createPublicationSchema } from "@/features/publications/lib/publicationValidation";
import {
  createPublicationForProfile,
  listPublicationsForProfile,
} from "@/features/publications/lib/publicationsRepository";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const profile = await getCurrentPublicationProfile();

  if (!profile) {
    return NextResponse.json({ message: "Necesitás iniciar sesión." }, { status: 401 });
  }

  const publications = await listPublicationsForProfile(profile.id);

  return NextResponse.json({ publications });
}

export async function POST(request: Request) {
  const profile = await getCurrentPublicationProfile();

  if (!profile) {
    return NextResponse.json({ message: "Necesitás iniciar sesión." }, { status: 401 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "El cuerpo de la solicitud no es válido." }, { status: 400 });
  }

  const parsed = createPublicationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Revisá los campos marcados.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  try {
    const publication = await createPublicationForProfile(profile.id, parsed.data);

    return NextResponse.json({ publication }, { status: 201 });
  } catch (error) {
    console.error("Failed to create publication", error);

    return NextResponse.json(
      { message: "No pudimos guardar la publicación. Intentá nuevamente." },
      { status: 500 },
    );
  }
}