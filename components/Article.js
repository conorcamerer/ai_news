import { useState, useEffect, useRef } from 'react'
import { useMachine, useSetup } from '@zag-js/react'
import * as popover from '@zag-js/popover'

export default function ArticleComponent({article, index}) {
    const [state, send] = useMachine(popover.machine)
    const ref = useSetup({ send, id: "1" })
    const api = popover.connect(state, send)

    return (
        <div key={index} className="relative w-screen h-screen p-6 sec">
          <div className="absolute flex gap-4 text-white font-bold text-xl font-space">
            <small className="flicker">
              Generated on {article.created_at}
              <br/>
              _ref: {article.gen}/{article.id}
            </small>
            <div ref={ref}>
              <svg {...api.triggerProps} className="cursor-pointer" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              <div {...api.positionerProps}>
                <div {...api.contentProps} className="p-2 w-72 border rounded-r-lg text-neutral-200 bg-[#0a0a0a] text-sm">
                  <div className="flex justify-between">
                    <div {...api.titleProps}>Prompt</div>
                    <button {...api.closeButtonProps} className="focus:outline-none">•</button>
                  </div>
                  <div {...api.descriptionProps} className="font-normal">&quot;{article.prompt}&quot;</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-28 flex flex-col items-center">
            <h2 className="text-white font-bold text-4xl font-space text-center">&quot;{article.title}&quot;</h2>
            <p className="mt-12 text-neutral-500 tracking-tight text-lg text-justify w-1/2">{article.content}</p>
          </div>
        </div>
    )
}