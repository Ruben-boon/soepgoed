import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  // Check for secret to confirm this is a valid request
  if (secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { slug, _type } = body

    // Revalidate different paths based on content type
    if (_type === 'page') {
      // Revalidate the specific page
      if (slug === 'home') {
        revalidatePath('/', 'page')
      } else {
        revalidatePath(`/${slug}`, 'page')
      }
    } else if (_type === 'post') {
      // Revalidate the blog post page and news overview
      revalidatePath(`/nieuws/${slug}`, 'page')
      revalidatePath('/nieuws', 'page')
      // Also revalidate home if posts are shown there
      revalidatePath('/', 'page')
    } else if (_type === 'navSubType' || _type === 'footerSubType' || _type === 'metaDataSubType' || _type === 'contactSubType') {
      // These affect the layout, so revalidate all pages
      revalidatePath('/', 'layout')
    } else {
      // For any other content type, revalidate all
      revalidatePath('/', 'layout')
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      paths: slug ? [slug] : ['layout']
    })
  } catch (err) {
    console.error('Error revalidating:', err)
    return NextResponse.json(
      { message: 'Error revalidating', error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
