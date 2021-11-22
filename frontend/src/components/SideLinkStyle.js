import styled from "styled-components";

const SideLink = styled.a`
    color: black;
    padding: 10px;
    border: 1px solid #ced4da;
    :first-child {
        border-bottom: none;
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
    }
    :last-child {
        border-top: none;
        border-bottom-left-radius: 0.25rem;
        border-bottom-right-radius: 0.25rem;
    }
`;

const activeLink = {
    color: '#fff',
    backgroundColor: '#007bff'
};

export {
    SideLink, activeLink
}