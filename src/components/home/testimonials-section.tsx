'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { mockTestimonials } from '@/data/mock-data'

export function TestimonialsSection() {
  return (
    <section className="border-b border-black/[0.06] bg-[#fafaf8] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c4351f]">Voices from the network</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">What our members say</h2>
          <p className="mt-3 text-sm text-muted-foreground">Creators and teams using profile-first discovery.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {mockTestimonials.filter((t) => t.author?.name).map((testimonial, index) => {
            const authorName = testimonial.author!.name
            const authorAvatar = testimonial.author!.avatar || '/placeholder.svg?height=80&width=80'
            return (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full rounded-[1.75rem] border-black/[0.06] bg-white/70 shadow-[0_18px_50px_rgba(0,0,0,0.05)] backdrop-blur-md">
                <CardContent className="flex h-full flex-col p-6">
                  <Quote className="mb-4 h-8 w-8 text-[#ff4d2e]/40" />
                  <p className="mb-6 flex-1 text-sm leading-7 text-muted-foreground">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={authorAvatar} alt={authorName} />
                        <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-foreground">{authorName}</div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role} at {testimonial.company}
                        </div>
                      </div>
                    </div>
                    <div className="flex">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#ff4d2e] text-[#ff4d2e]" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
