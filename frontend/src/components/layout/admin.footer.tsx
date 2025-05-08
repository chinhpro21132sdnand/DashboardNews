'use client'
import { Layout } from 'antd';

const AdminFooter = () => {
    const { Footer } = Layout;

    return (
        <>
            <Footer style={{ textAlign: 'center' }}>
                BASE NEXTJS ©{new Date().getFullYear()} Created by @tienchinhjr
            </Footer>
        </>
    )
}

export default AdminFooter;