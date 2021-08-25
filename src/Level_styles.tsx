import { styled, theme } from './stitches.config'

export const ProgressWidget = styled('div', {
  height: '5px',
})

export const ProgressBackground = styled(ProgressWidget, {
  width: '100%',
  backgroundColor: theme.colors.gray,
  position: 'relative',
  marginBottom: '10px'
})

export const ProgressForeground = styled(ProgressWidget, {
  backgroundColor: theme.colors.brightGreen,
  position: 'absolute',
  top: 0
})

export const LevelHeader = styled('div', {
  margin: '0.8em 0',
  display: 'flex',
  alignItems: 'center'
})

export const LevelName = styled('div', {
  cursor: 'pointer',
  fontSize: '1.5em',
  fontWeight: 'bold'
})


