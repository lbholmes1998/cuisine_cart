import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

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
        <div>Server is: {serverStatus.status}</div>
    )
}