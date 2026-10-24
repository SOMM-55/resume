import { prisma } from "../db";

interface RollupIncrement {
  date: string; // YYYY-MM-DD
  metric: string;
  dimension?: string;
  amount?: number;
}

export async function incrementRollups(items: RollupIncrement[]): Promise<void> {
  if (items.length === 0) return;

  // Run sequentially or via transaction
  for (const item of items) {
    const dimension = item.dimension ?? "";
    const amount = item.amount ?? 1;
    try {
      await prisma.dailyRollup.upsert({
        where: {
          date_metric_dimension: {
            date: item.date,
            metric: item.metric,
            dimension,
          },
        },
        update: {
          count: { increment: amount },
        },
        create: {
          date: item.date,
          metric: item.metric,
          dimension,
          count: amount,
        },
      });
    } catch (err) {
      // Don't crash request if rollup update fails
      console.error("Rollup increment error:", err);
    }
  }
}
