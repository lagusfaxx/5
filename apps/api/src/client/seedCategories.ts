import { prisma } from "../db";
import { CategoryKind } from "@prisma/client";

/**
 * Crea categorías por defecto (si aún no existen).
 * Esto evita que el Home muestre "No hay categorías disponibles" en un DB nueva.
 */
export async function seedCategories(): Promise<void> {
  const count = await prisma.category.count();
  if (count > 0) return;

  await prisma.category.createMany({
    data: [
      // Profesionales
      { name: "Masajes", kind: CategoryKind.PROFESSIONAL },
      { name: "Acompañantes", kind: CategoryKind.PROFESSIONAL },
      { name: "Modelos", kind: CategoryKind.PROFESSIONAL },
      { name: "Bailarinas", kind: CategoryKind.PROFESSIONAL },

      // Establecimientos
      { name: "Moteles", kind: CategoryKind.ESTABLISHMENT },
      { name: "Sex Shop", kind: CategoryKind.ESTABLISHMENT },
      { name: "Club", kind: CategoryKind.ESTABLISHMENT },
      { name: "Saunas", kind: CategoryKind.ESTABLISHMENT },
    ],
    skipDuplicates: true
  });
}
