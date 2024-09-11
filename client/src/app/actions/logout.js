'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function handleLogout() {
    cookies().delete('Authorization')
    redirect('/')
}

export default handleLogout;
