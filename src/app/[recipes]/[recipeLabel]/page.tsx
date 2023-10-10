import { ContentLayout } from '@/components/content-layout'
import { ExternalLink, MoodOk, SquareCheck } from '@/icons/icons'
import { RecipeAPI } from '@/types/recipeAPI'
import Image from 'next/image'

export default async function Recipe ({ params: { recipeLabel } } : { params: { recipeLabel: string} }) {
  const baseURL = 'https://api.edamam.com/api/recipes/v2/'
  const params = new URLSearchParams()
  params.set('type', 'public')
  params.set('app_id', process.env.APPLICATION_ID!)
  params.set('app_key', process.env.APPLICATION_KEYS!)

  const res = await fetch(baseURL + recipeLabel + '?' + params, { headers: { 'Accept-Language': 'en' } })
  const { recipe } = await res.json() as RecipeAPI

  return (
    <ContentLayout>
      <article className='max-w-4xl m-auto p-3'>
        <div className='grid grid-cols-[100px,1fr] gap-4 items-center'>
          <Image className='rounded-lg' src={recipe.images.THUMBNAIL.url} height={recipe.images.THUMBNAIL.height} width={recipe.images.THUMBNAIL.width} alt={recipe.label} />
          <div className=''>
            <h1 className='text-3xl font-bold mb-2'>{recipe.label}</h1>
            <div className='flex flex-wrap gap-2'>
              <p className='capitalize text-sm py-1 px-2 bg-pink-700 rounded'>
                {recipe.cuisineType} food
              </p>
              <p className='capitalize text-sm py-1 px-2 bg-indigo-700 rounded'>
                {recipe.mealType}
              </p>
              {
                recipe.dietLabels.map(hLabel => (
                  <p key={hLabel} className='capitalize text-sm py-1 px-2 bg-green-700 rounded'>
                    {hLabel}
                  </p>
                ))
              }
            </div>
          </div>
        </div>
        <div className='flex flex-wrap justify-between my-4 gap-4'>
          <div className='max-w-full md:max-w-[50%]'>
            <h2 className='my-2 text-3xl font-bold underline'>Ingredients</h2>
            <ul>
              {
              recipe.ingredients.map(ingredient => (
                <li key={ingredient.text} className='my-1 flex gap-2'>
                  <SquareCheck className='flex-shrink-0' />
                  {ingredient.text}
                </li>
              ))
            }
            </ul>
            <a href={recipe.url} className='bg-rose-700 hover:bg-rose-600 transition-colors block w-fit my-8 p-4 rounded' target='_blank' rel='noopener noreferrer'>
              Go to recipe page <ExternalLink className='float-right ms-1' />
            </a>

            <h2 className='mt-8 mb-2 text-3xl font-bold underline'>Dietary Considerations</h2>
            {
            recipe.healthLabels.map((healthLabel) => (
              <p className='flex gap-2 my-2' key={healthLabel}><MoodOk /> {healthLabel}</p>
            ))
          }
          </div>
          <div className=''>
            <h2 className='my-2 text-3xl font-bold underline'>Nutrition Facts</h2>
            <table>
              <thead className='border-b-4 border-white'>
                <tr>
                  <th className='text-start'>Nutrient</th>
                  <th className='text-start'>Quantity</th>
                  <th className='text-start whitespace-nowrap'>Daily (%)</th>
                </tr>
              </thead>
              <tbody>
                {
              Object.keys(recipe.totalNutrients).map(nutrient => (
                <tr className='border-b-2 border-zinc-800' key={nutrient}>
                  <td className='pe-5'>
                    {recipe.totalNutrients[nutrient].label}
                  </td>
                  <td className='pe-5'>
                    {(recipe.totalNutrients[nutrient].quantity / recipe.yield).toFixed(2)}
                    {recipe.totalNutrients[nutrient].unit}
                  </td>
                  <td>
                    {
                      recipe.totalDaily[nutrient]?.quantity
                        ? (recipe.totalDaily[nutrient].quantity / recipe.yield).toFixed(2)
                        : '-'
                    }
                    {recipe.totalDaily[nutrient]?.unit ?? ''}
                  </td>
                </tr>
              ))
            }
              </tbody>
            </table>
          </div>
        </div>
      </article>
    </ContentLayout>
  )
}
