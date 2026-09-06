


import { db } from '@/lib/db';
import { businesses } from '@/lib/db/schema';
import { getOrGenerateWeeklySuggestions } from '@/lib/suggestions/orchestrator';
import { isNotNull } from 'drizzle-orm';
import type { NextRequest } from 'next/server';

type failed = {
  businessId: string;
  error: string
}
 
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
 
  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  const bs = await db.select().from(businesses)
      .where(isNotNull(businesses.onboardingCompletedAt))


  let successCount = 0;
  const failed: failed[] = [];
  for(const b of bs){
    try{
      await getOrGenerateWeeklySuggestions(b)
      successCount += 1;
    }catch(e){
        failed.push({businessId: b.id, error:(e instanceof Error) ? e.message : String(e)});
    }
    
  }
 
  return Response.json({ processed: successCount, failed: failed });
}