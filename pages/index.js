import { useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@supabase/supabase-js'
import handleViewport from 'react-in-viewport'
import Article from '/components/Article'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)



const Block = ({ forwardedRef }) => {
  return (
    <div ref={forwardedRef} className="relative w-screen h-screen p-6 sec">
      <div className="absolute flex gap-4 text-neutral-700 font-bold text-xl font-space">
        <small className="flicker">
          Generated on&nbsp;<div className="inline-block bg-neutral-900 rounded animate-pulse w-32">&nbsp;</div>
          <br/>
          _ref:&nbsp;<div className="inline-block bg-neutral-900 rounded animate-pulse w-14">&nbsp;</div>
        </small>
      </div>
      <div className="mt-28 flex flex-col items-center">
        <div className="inline-block bg-neutral-900 rounded animate-pulse w-72 text-4xl">&nbsp;</div>
      </div>
    </div>
  )
}

const ViewportBlock = handleViewport(Block)


export default function Index() {
  const [articles, setArticles] = useState([])

  async function getArticle() {
    console.log('%cLoading 1 article', 'color:#f4a261')
    Math.floor(Math.random() * 4)
    //const { data, error } = await supabase.rpc('ts_2r2')
    const { data, error } = await supabase
      .from('articles')
      .select()
      .match({id: Math.floor(Math.random() * 11) + 1})

    setArticles([...articles, data[0]])
    console.log('%cLoaded article #'+data[0].id, 'color:#fb8500')
  }


  return (
    <main className="overflow-x-hidden divide-y con px-4 lg:px-0">
      <motion.div
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
      className="w-screen h-screen flex flex-col justify-center items-center sec">
        <h1 className="text-white font-bold text-5xl lg:text-6xl font-space text-center mb-2">AI GENERATED NEWS</h1>
        <h3 className="text-neutral-500 text-lg font-space text-center mb-12">A collection of 212 randomly generated articles</h3>
        <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="text-white mt-6">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </motion.div>
      </motion.div>
      
      {articles.length!==0 && articles.map((article, index) => (
        <Article key={index} article={article} index={index} />
      ))}

      <ViewportBlock onEnterViewport={() => getArticle()} />

    </main>
  )
}