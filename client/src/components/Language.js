import React from 'react'
import "../assets/styles/Language.css"
import { Icon } from 'react-icons-kit'
import {uFE4E6} from 'react-icons-kit/noto_emoji_regular/uFE4E6'
import {chevronDown} from 'react-icons-kit/feather/chevronDown'

const Language = () => {
    return (
        <div>
            <div class="language-content">
                <div class="language-title">Language</div>
                <div class="language-box"></div>
                <div class="language-option">
                    <button class="language-button">Language
                    <Icon icon={chevronDown} size={20} />
                    </button>
                    <div class="language-button-content">
                        <a href="#">
                        <Icon icon={uFE4E6} size={20} />
                        English</a>
                        <a href="#">
                        <Icon icon={uFE4E6} size={20} />Indonesia</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Language