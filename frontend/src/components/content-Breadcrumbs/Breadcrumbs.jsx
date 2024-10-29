import React from 'react';
import { Breadcrumbs } from "@material-tailwind/react";
import { Link } from 'react-router-dom';

const BreadcrumbsCustom = ({ links }) => {
    return (
        <div className=" ml-3">
            <Breadcrumbs className="bg-gray-100 px-4 py-2 rounded-md shadow">
                {links.map((link, index) =>
                    link.to ? (
                        <Link
                            key={index}
                            to={link.to}
                            className="text-blue-500 hover:underline"
                        >
                            {link.label}
                        </Link>
                    ) : (
                        <span key={index}>{link.label}</span>
                    )
                )}
            </Breadcrumbs>
        </div>
    );
};

export default BreadcrumbsCustom;
