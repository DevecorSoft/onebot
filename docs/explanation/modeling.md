# Onebot Modeling

```mermaid
classDiagram
  space "*" --* "1" chatApp
  thread "*" --* "1" space
  member "*" --o "1" space
  member "*" --o "1" thread
  member ..|> onebot
  member "1" --o "*" message
  message "*" --o "1" space
  message "*" --o "1" thread
  rotation --* onebot
```
