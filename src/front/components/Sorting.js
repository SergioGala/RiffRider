import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { ChevronUp, ChevronDown, Music, User, Disc } from 'lucide-react';

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 var(--primary);
  }
  70% {
    box-shadow: 0 0 0 10px transparent;
  }
  100% {
    box-shadow: 0 0 0 0 transparent;
  }
`;

const SortingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--background);
  border: 2px solid var(--primary);
  border-radius: 50px;
  padding: 5px;
  box-shadow: 0 0 20px var(--primary);
  backdrop-filter: blur(10px);
  margin: 20px 0;
`;

const SortOption = styled.button`
  background: ${props => props.isActive ? 'var(--secondary)' : 'transparent'};
  border: none;
  color: var(--text);
  padding: 10px 20px;
  margin: 0 5px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  font-weight: ${props => props.isActive ? 'bold' : 'normal'};

  &:hover {
    background: var(--primary);
    color: var(--background);
    transform: translateY(-2px);
  }

  ${props => props.isActive && css`
    animation: ${pulse} 1.5s infinite;
  `}

  svg {
    margin-right: 5px;
  }
`;

const OrderButton = styled.button`
  background: var(--secondary);
  border: none;
  color: var(--text);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--primary);
    color: var(--background);
    transform: scale(1.1);
  }

  svg {
    transition: all 0.3s ease;
  }
`;

function Sorting({ sortCriteria, setSortCriteria, sortOrder, setSortOrder }) {
  const [hoveredOrder, setHoveredOrder] = useState(null);

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
  };

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <SortingContainer>
      <SortOption 
        isActive={sortCriteria === 'name'} 
        onClick={() => handleSortChange('name')}
      >
        <Music size={18} />
        Título
      </SortOption>
      <SortOption 
        isActive={sortCriteria === 'artists'} 
        onClick={() => handleSortChange('artists')}
      >
        <User size={18} />
        Artista
      </SortOption>
      <SortOption 
        isActive={sortCriteria === 'album'} 
        onClick={() => handleSortChange('album')}
      >
        <Disc size={18} />
        Álbum
      </SortOption>
      <OrderButton 
        onClick={toggleSortOrder}
        onMouseEnter={() => setHoveredOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        onMouseLeave={() => setHoveredOrder(null)}
      >
        {hoveredOrder ? 
          (hoveredOrder === 'asc' ? <ChevronUp /> : <ChevronDown />) :
          (sortOrder === 'asc' ? <ChevronUp /> : <ChevronDown />)
        }
      </OrderButton>
    </SortingContainer>
  );
}

export default Sorting;