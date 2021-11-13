import type { NextPage } from 'next'

import Banner from '../../components/banner'
import Example from '../../components/example'

import { Collection } from '../../interface/collection'
import { Component } from '../../interface/component'

import { currentCollectionComponents } from '../../lib/components'
import { collectionIds, currentCollection } from '../../lib/collections'

export async function getStaticPaths() {
  let paths = collectionIds()

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: { id } }: Params) {
  let collection = currentCollection(id)
  let components = currentCollectionComponents(id)

  return {
    props: {
      collection,
      components,
    },
  }
}

type Params = {
  params: {
    id: string
  }
}

type Props = {
  collection: Collection
  components: Array<Component>
}

const Collection: NextPage<Props> = ({ collection, components }) => {
  let { spacing } = collection
  return (
    <div>
      <Banner
        title={collection.title}
        subtitle={`${collection.count} components`}
        button={false}
      />

      <div className="container py-8 sm:py-16">
        <ul className="space-y-8 sm:space-y-16">
          {components.map((component, index) => (
            <Example
              key={index}
              component={component}
              parentSpacing={spacing}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Collection