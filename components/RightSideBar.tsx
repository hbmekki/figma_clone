import React, { useRef } from 'react'
import Dimensions from './settings/Dimensions'
import Text from './settings/Text'
import Color from './settings/Color'
import Export from './settings/Export'
import { RightSidebarProps } from '@/types/type'
import { modifyShape } from '@/lib/shapes'

const RightSideBar = ({
    elementAttributes,
    setElementAttributes,
    fabricRef,
    isEditingRef,
    activeObjectRef,
    syncShapeInStorage }: RightSidebarProps) => {
    
    const colorInputRef = useRef<HTMLInputElement>(null);
    const strokeInputRef = useRef<HTMLInputElement>(null);
    
    const handleInputChange = (property: string, value:string) => {
        if (!isEditingRef.current) isEditingRef.current = true;
        setElementAttributes((prev) => ({
            ...prev,
            [property]: value
        }))
        modifyShape({
            canvas: fabricRef.current as fabric.Canvas,
            property,
            value,
            activeObjectRef,
            syncShapeInStorage
        })
    
    } 
    return (
        <section className='flex flex-col border-t border-primary-grey-200 bg-primary-black text-primary-grey-300 min-2-[227px sticky right-0 h-full max-sm:hidden select-none'>
            <h3 className="px-5 pt-4 text-xs uppercase">Design</h3>

            <span className="text-xs text-primary-grey-300 mt-3 px-3 border-b border-primary-grey-200">
                Testing the right side bar!
            </span>
            <Dimensions 
                width={elementAttributes.width}
                height={elementAttributes.height}
                isEditingRef={isEditingRef}
                handleInputChange={handleInputChange}
            />
            <Text
                fontFamily={elementAttributes.fontFamily}
                fontWeight={elementAttributes.fontWeight}
                fontSize={elementAttributes.fontSize}
                handleInputChange={handleInputChange}
            />
            <Color
                inputRef={strokeInputRef}
                attribute={elementAttributes.stroke}
                attributeType='stroke'
                placeholder='Stroke'
                handleInputChange={handleInputChange}
            />
            <Color
                inputRef={colorInputRef}
                attribute={elementAttributes.fill}
                attributeType='fill'
                placeholder='color'
                handleInputChange={handleInputChange}
            />
            <Export />
        </section>
    )
}

export default RightSideBar