import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import RootLayout from '../app/Layout'

type ServerStatus = {
    status: string
}

export const getServerSideProps = (async (context) => {
    const res = await fetch("http://127.0.0.1:8080/status")
    const serverStatus = await res.json()
    return {props: {serverStatus} }
}) satisfies GetServerSideProps<{serverStatus: ServerStatus}>

export default function Status({
    serverStatus,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <RootLayout>
            <h1>Server is: {serverStatus.status}</h1>
            <p>Go to <a href="/RecipeSearch">Recipe Search</a></p>
        </RootLayout>
    )
}