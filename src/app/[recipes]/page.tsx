import { type RecipesAPI } from '@/types/recipesAPI'
import Image from 'next/image'
import Link from 'next/link'
import styles from './page.module.css'
import { ContentLayout } from '@/components/content-layout'

export default async function Recipes ({ searchParams } : { searchParams: Record<string, string> }) {
  const baseURL = 'https://api.edamam.com/api/recipes/v2?'
  const params = new URLSearchParams({
    type: 'any',
    app_id: process.env.APPLICATION_ID!,
    app_key: process.env.APPLICATION_KEYS!,
    ...searchParams
  })

  const res = await fetch(baseURL + params, { headers: { 'Accept-Language': 'en' } })
  const data = await res.json() as RecipesAPI

  const recipes = data?.hits

  if (!recipes || recipes.length === 0) return <h1>No hay recetas :(</h1>

  return (
    <ContentLayout>
      <article className='max-w-4xl mx-auto p-3 overflow-hidden'>
        <main className='grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4'>
          {
            recipes.map(({ recipe, _links }, index) => {
              const recipeId = _links.self.href.split('/')[6].split('?')[0]
              return (
                <Link key={recipe.label + index} href={`/recipes/${recipeId}`} className={`${styles.recipe} relative rounded overflow-hidden shadow hover:shadow-md`}>
                  <Image className='w-full' src={recipe.images.REGULAR.url} height={recipe.images.REGULAR.height} width={recipe.images.REGULAR.width} alt={recipe.label} blurDataURL={recipe.images.THUMBNAIL.url} priority />
                  <h2 className={`${styles.recipeName} text-sm md:text-2xl font-bold p-3 text-center`}>
                    {recipe.label.length > 35 ? `${recipe.label.substring(0, 35)}...` : recipe.label}
                  </h2>
                </Link>
              )
            })
          }
          {/* <p>{data._links.next.href}</p> */}
        </main>
      </article>
    </ContentLayout>
  )
}
