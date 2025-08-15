import Navbar from '@/components/elements/Navbar';
import LanguageSwitcher from '@/components/elements/LanguageSwitcher';

const MobileDrawer = ({ isOpen, onClose }) => {
  return (


    <div
      className={`lg:hidden
            w-full 
            fixed 
            bottom-0
            left-0
            h-auto 
            bg-white 
            shadow-lg 
            transform 
            transition-transform 
            duration-400 
            ease-in-out 
            origin-bottom 
            ${isOpen ? 'translate-y-0' : 'translate-y-full'} 
          `} onClick={onClose}>

      {/* Header/Title Section */}
      <div className="mb-4 pl-4 pt-3 flex justify-between items-center"> {/* Add margin-bottom for spacing */}
        <div>
          <h2 className="text-md">GDG Montreal</h2>
          <p className="text-gray-500 text-sm">Tech Community</p>
        </div>
        <div className="pr-4">
          <LanguageSwitcher />
        </div>
      </div>

      <Navbar isMobile={true} />


    </div>


  );
};

export default MobileDrawer;
