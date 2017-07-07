<?php

namespace AppBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use JMS\Serializer\Annotation as JMS;

/**
 *  @ODM\Document
 */
class Sentiment {

    /**
     * @ODM\Id
     * @JMS\Type("integer")
     */
    private $id;

    /**
     * @ODM\Field(type="integer", name="score")
     * @JMS\Type("integer")
     */
    private $score;

    /**
     * @ODM\Field(type="float", name="comparative")
     * @JMS\Type("double")
     */
    private $comparative;

    /**
     * @ODM\Field(type="collection", name="tokens")
     * @JMS\Type("array")
     */
    private $tokens;

    /**
     * @ODM\Field(type="collection", name="words")
     * @JMS\Type("array")
     */
    private $words;

    /**
     * @ODM\Field(type="collection", name="positive")
     * @JMS\Type("array")
     */
    private $positive;

    /**
     * @ODM\Field(type="collection", name="negative")
     * @JMS\Type("array")
     */
    private $negative;


    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getScore()
    {
        return $this->score;
    }

    /**
     * @param mixed $score
     */
    public function setScore($score)
    {
        $this->score = $score;
    }

    /**
     * @return mixed
     */
    public function getComparative()
    {
        return $this->comparative;
    }

    /**
     * @param mixed $comparative
     */
    public function setComparative($comparative)
    {
        $this->comparative = $comparative;
    }

    /**
     * @return mixed
     */
    public function getTokens()
    {
        return $this->tokens;
    }

    /**
     * @param mixed $tokens
     */
    public function setTokens($tokens)
    {
        $this->tokens = $tokens;
    }

    /**
     * @return mixed
     */
    public function getWords()
    {
        return $this->words;
    }

    /**
     * @param mixed $words
     */
    public function setWords($words)
    {
        $this->words = $words;
    }

    /**
     * @return mixed
     */
    public function getPositive()
    {
        return $this->positive;
    }

    /**
     * @param mixed $positive
     */
    public function setPositive($positive)
    {
        $this->positive = $positive;
    }

    /**
     * @return mixed
     */
    public function getNegative()
    {
        return $this->negative;
    }

    /**
     * @param mixed $negative
     */
    public function setNegative($negative)
    {
        $this->negative = $negative;
    }
}
