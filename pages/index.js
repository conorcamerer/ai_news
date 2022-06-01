import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@supabase/supabase-js'
import { useIntersection } from '/lib/useIntersection'
import Article from '/components/Article'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Index() {
  const [articles, setArticles] = useState([])
  const lastSlide = useRef()
  const inViewport = useIntersection(lastSlide)

  if (inViewport === true) {
    getArticle()
  }


  async function getArticle() {
    const maxEdge = articles.length
    const { data, error } = await supabase.from('articles').select().range(maxEdge, maxEdge+1)
    if (maxEdge === 0) {
      setArticles(data)
    } else {
      setArticles([...articles, ...data])
    }
  }


  return (
    <main className="overflow-x-hidden divide-y con">
      <motion.div
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
      className="w-screen h-screen flex flex-col justify-center items-center sec">
        <h1 className="text-white font-bold text-6xl font-space text-center mb-2">AI GENERATED NEWS</h1>
        <h3 className="text-neutral-500 text-lg font-space text-center mb-12">A collection of 212 randomly generated articles</h3>
        <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="text-white mt-6">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </motion.div>
      </motion.div>

      {articles && articles.map((article, index) => (
        <Article key={index} article={article} index={index} />
      ))}

      <div ref={lastSlide} className="relative w-screen h-screen p-6 sec">
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

    </main>
  )
}