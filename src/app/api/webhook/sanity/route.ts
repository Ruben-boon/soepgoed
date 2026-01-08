import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  // Check for secret to confirm this is a valid request
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }

  try {
    const body = await request.json()

    // Sanity webhook payload structure
    const { _type, slug, urlSlug, meta } = body

    // Extract slug from different possible locations
    let pageSlug: string | null = null

    if (urlSlug?.current) {
      pageSlug = urlSlug.current
    } else if (slug?.current) {
      pageSlug = slug.current
    } else if (meta?.slug?.current) {
      pageSlug = meta.slug.current
    }

    console.log('Webhook received:', { _type, pageSlug })

    // Revalidate different paths based on content type
    if (_type === 'page') {
      // Revalidate the specific page
      if (pageSlug === 'home') {
        revalidatePath('/', 'page')
        console.log('Revalidated: /')
      } else if (pageSlug) {
        revalidatePath(`/${pageSlug}`, 'page')
        console.log(`Revalidated: /${pageSlug}`)
      }
    } else if (_type === 'post') {
      // Revalidate the blog post page and news overview
      if (pageSlug) {
        revalidatePath(`/nieuws/${pageSlug}`, 'page')
        console.log(`Revalidated: /nieuws/${pageSlug}`)
      }
      revalidatePath('/nieuws', 'page')
      // Also revalidate home if posts are shown there
      revalidatePath('/', 'page')
      console.log('Revalidated: /nieuws and /')
    } else if (_type === 'navSubType' || _type === 'footerSubType' || _type === 'metaDataSubType' || _type === 'contactSubType') {
      // These affect the layout, so revalidate all pages
      revalidatePath('/', 'layout')
      console.log('Revalidated: entire layout')
    } else {
      // For any other content type, revalidate all
      revalidatePath('/', 'layout')
      console.log('Revalidated: entire layout (unknown type)')
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type: _type,
      slug: pageSlug
    })
  } catch (err) {
    console.error('Error revalidating:', err)
    return NextResponse.json(
      { message: 'Error revalidating', error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
