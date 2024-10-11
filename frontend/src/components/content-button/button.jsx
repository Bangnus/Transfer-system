import PropTypes from 'prop-types'

const ButtonComponent = ({ label, icons }) => {
    return (
        <div className="">
            <button className="rounded-md bg-blue-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
                {icons}{label}
            </button>
        </div>
    );
};

ButtonComponent.propTypes = {
    label: PropTypes.string.isRequired,
    icons: PropTypes.node
}

export default ButtonComponent