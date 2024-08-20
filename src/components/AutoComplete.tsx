import { KeyboardEvent, useState } from 'react';
import styled from 'styled-components';
import UUIDService from '../service/UUIDService';
import Input from './Input';
import { layout } from './ui/Variables';
import { useLoading } from './Loading';

interface AutocompleteProps {
    fetchSuggestions: (query: string) => Promise<any[]>;
    suggestionLabel: string;
    onSelect: (value: string) => void;
}

const AutoCompleteComponent = styled.div`
    position: relative;
`

const AutoCompleteSuggestionList = styled.ul`
    position: absolute;
    top: 30px;
    left: 0;
    list-style: none;
    background-color: white;
    border: 1px solid ${layout.black};
    border-top: none;
    z-index: 9;
    width: 100%;
    list-style-type: none;
    padding: 0;
`;
const AutoCompleteSuggestion = styled.li`
    cursor: pointer;
    padding: 10px;
    &:hover {
        background-color: ${layout.lightGrey};
    }
`

export default function AutoComplete({ fetchSuggestions, onSelect, suggestionLabel }: AutocompleteProps) {
    const {loading} = useLoading();
    const [inputValue, setInputValue] = useState<string>('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [activeSuggestion, setActiveSuggestion] = useState<number>(-1);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

    const handleChange = (value: any) => {
        setInputValue(value);
        fetchSuggestions(value).then(setSuggestions);
        setShowSuggestions(true);
    };

    const handleSelect = (value: any) => {
        setShowSuggestions(false);
        setInputValue(value[suggestionLabel]);
        onSelect(value);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown') {
            setActiveSuggestion((prev) => (prev + 1) % suggestions.length);
        } else if (e.key === 'ArrowUp') {
            setActiveSuggestion((prev) => (prev === 0 ? suggestions.length - 1 : prev - 1));
        } else if (e.key === 'Enter' && activeSuggestion >= 0) {
            handleSelect(suggestions[activeSuggestion]);
        }
    };

    return (
        <AutoCompleteComponent>
            <Input
                type="text"
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                icon={loading && <img src={process.env.PUBLIC_URL + '/loading.svg'} alt='loading'/>}
                iconAlign="right"
                disableLoading
            />
            {showSuggestions && (
                <AutoCompleteSuggestionList>
                    {suggestions.map((suggestion) => (
                        <AutoCompleteSuggestion
                            key={UUIDService.generateUUID()}
                            onClick={() => handleSelect(suggestion)}
                        >
                            {suggestion[suggestionLabel]}
                        </AutoCompleteSuggestion>
                    ))}
                </AutoCompleteSuggestionList>
            )}
        </AutoCompleteComponent>
    );
};
