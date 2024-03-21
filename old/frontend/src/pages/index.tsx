import type {  NextPage } from 'next'
import Head from 'next/head'
import RootLayout from '../app/layout'


export default function NextPage() {
    return (
        <RootLayout>
            <Head>
                <title>Home</title>
                <meta name="description" content="Cuisine Cart Static page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <h1>Welcome</h1>
            </main>
        </RootLayout>
    )
}
