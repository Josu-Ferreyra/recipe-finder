'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronDown } from '@/icons/icons'
import styles from './page.module.css'

export default function Search () {
  const [showFilters, setShowFilters] = useState(false)
  const router = useRouter()

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)

    const searchParams = new URLSearchParams()
    formData.forEach((value, key) => {
      if (value) {
        searchParams.append(key, value as string)
      }
    })

    const url = `/recipes?${searchParams}`
    router.push(url)
  }

  return (
    <main className='bg-zinc-950 relative isolate'>
      {/* Background */}
      <div className={`${styles.moveBackground} mainBackground inset-0 absolute -z-10`} />

      {/* Content */}
      <article className='max-w-4xl mx-auto p-3 grid place-content-center h-full'>
        <h1 className='text-6xl text-center font-bold my-12'>The Recipe Finder</h1>
        <form className='flex flex-col gap-4' action='/recipes' onSubmit={handleSearch}>
          <fieldset>
            <legend className='hidden'>Dish Name</legend>
            <label className='hidden' htmlFor='dishName'>Dish Name</label>
            <input className='w-full rounded p-3' id='dishName' name='q' type='text' placeholder='Dish Name' />
          </fieldset>

          <button type='button' className='text-sm flex justify-between items-center p-3 bg-rose-900 rounded' onClick={() => setShowFilters(!showFilters)}>
            <ChevronDown className={`${showFilters ? 'rotate-180' : ''} transition-transform`} /> {showFilters ? 'Hide' : 'Show'} Additional filters <ChevronDown className={`${showFilters ? 'rotate-180' : ''} transition-transform`} />
          </button>

          {
            showFilters
              ? (
                <fieldset className='flex flex-col gap-3'>
                  <fieldset className='flex flex-col text-center gap-1'>
                    <legend className='hidden'>Meal Type</legend>
                    <label className='text-sm' htmlFor='mealType'>Meal Type</label>
                    <select id='mealType' name='mealType' className='p-2 rounded' placeholder='Meal Type' defaultValue=''>
                      <option value=''>Any</option>
                      <option value='breakfast'>Breakfast</option>
                      <option value='dinner'>Dinner</option>
                      <option value='lunch'>Lunch</option>
                      <option value='snack'>Snack</option>
                      <option value='teatime'>Teatime</option>
                    </select>
                  </fieldset>
                  <fieldset className='flex flex-col text-center gap-1'>
                    <legend className='hidden'>Diet</legend>
                    <label className='text-sm' htmlFor='diet'>Diet</label>
                    <select id='diet' name='diet' className='p-2 rounded' placeholder='Diet' defaultValue=''>
                      <option value=''>Any</option>
                      <option value='balanced'>Balanced</option>
                      <option value='high-fiber'>High Fiber</option>
                      <option value='high-protein'>High Protein</option>
                      <option value='low-carb'>Low Carb</option>
                      <option value='low-fat'>Low Fat</option>
                      <option value='low-sodium'>Low Sodium</option>
                    </select>
                  </fieldset>
                  <fieldset className='flex flex-col text-center gap-1'>
                    <legend className='hidden'>Dietary Considerations</legend>
                    <label className='text-sm' htmlFor='dietaryConsiderations'>Dietary Considerations</label>
                    <select className='p-2 rounded' name='health' id='dietaryConsiderations' defaultValue=''>
                      <option value=''>None</option>
                      <option value='alcohol-cocktail'>Alcohol Cocktail</option>
                      <option value='alcohol-free'>Alcohol Free</option>
                      <option value='celery-free'>Celery Free</option>
                      <option value='crustacean-free'>Crustacean Free</option>
                      <option value='dairy-free'>Dairy Free</option>
                      <option value='DASH'>DASH</option>
                      <option value='egg-free'>Egg Free</option>
                      <option value='fish-free'>Fish Free</option>
                      <option value='fodmap-free'>Fodmap Free</option>
                      <option value='gluten-free'>Gluten Free</option>
                      <option value='immuno-supportive'>Immuno Supportive</option>
                      <option value='keto-friendly'>Keto Friendly</option>
                      <option value='kidney-friendly'>Kidney Friendly</option>
                      <option value='kosher'>Kosher</option>
                      <option value='low-fat-abs'>Low Fat ABS</option>
                      <option value='low-potassium'>Low Potassium</option>
                      <option value='low-sugar'>Low Sugar</option>
                      <option value='lupine-free'>Lupine Free</option>
                      <option value='Mediterranean'>Mediterranean</option>
                      <option value='mollusk-free'>Mollusk Free</option>
                      <option value='mustard-free'>Mustard Free</option>
                      <option value='no-oil-added'>No Oil Added</option>
                      <option value='paleo'>Paleo</option>
                      <option value='peanut-free'>Peanut Free</option>
                      <option value='pescatarian'>Pescatarian</option>
                      <option value='pork-free'>Pork Free</option>
                      <option value='red-meat-free'>Red Meat Free</option>
                      <option value='sesame-free'>Sesame Free</option>
                      <option value='shellfish-free'>Shellfish Free</option>
                      <option value='soy-free'>Soy Free</option>
                      <option value='sugar-conscious'>Sugar Conscious</option>
                      <option value='sulfite-free'>Sulfite Free</option>
                      <option value='tree-nut-free'>Tree Nut Free</option>
                      <option value='vegan'>Vegan</option>
                      <option value='vegetarian'>Vegetarian</option>
                      <option value='wheat-free'>Wheat Free</option>
                    </select>
                  </fieldset>
                </fieldset>
                )
              : <></>
          }

          <button className='mt-1 bg-rose-700 p-4 rounded text-lg font-bold' type='submit'>Seach 🔎</button>
        </form>
      </article>
    </main>
  )
}
