import clsx from 'clsx';
import { InferGetStaticPropsType } from 'next';
import * as React from 'react';

import { getAllFilesFrontMatter } from '@/lib/mdx';
import { sortByDate } from '@/lib/mdx-client';
import useLoaded from '@/hooks/useLoaded';

import Accent from '@/components/Accent';
import Layout from '@/components/layout/Layout';
import ProjectCard from '@/components/projects/ProjectCard';
import Seo from '@/components/Seo';

export default function ProjectsPage({
  projects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const isLoaded = useLoaded();

  return (
    <Layout>
      <Seo templateTitle='Projects' />

      <main>
        <section className={clsx(isLoaded && 'fade-in-start')}>
          <div className='py-12 layout'>
            <h1 className='text-3xl md:text-5xl' data-fade='0'>
              <Accent>Projects</Accent>
            </h1>
            <p data-fade='1' className='mt-2 text-gray-600 dark:text-gray-300'>
              Showcase of my works on frontend development.
            </p>

            <ul
              data-fade='2'
              className='grid gap-4 mt-6 sm:grid-cols-2 xl:grid-cols-3'
            >
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </ul>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const files = await getAllFilesFrontMatter('projects');
  const projects = sortByDate(files);

  return { props: { projects } };
}