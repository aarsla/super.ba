<?php

namespace AppBundle\Controller;

use AppBundle\Form\SearchType;
use AppBundle\Form\TimeType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\HttpFoundation\Request;

/**
 * @Route("/tech")
 */
class TechController extends BaseController
{
    /**
     * @Route("/", name="tech")
     */
    public function indexAction(Request $request)
    {
        $items = $this->get('doctrine_mongodb')
            ->getRepository('AppBundle:Article')
            ->findAllSorted('Tech', $this->getNumberOfArticles(), $this->getFilterDate());

        return $this->render('tech/index.html.twig', [
            'items' => $items
        ]);
    }

    /**
     * @Route("/izvor/{source}", name="tech_source")
     */
    public function sourceAction(Request $request, $source)
    {
        $items = $this->get('doctrine_mongodb')
            ->getRepository('AppBundle:Article')
            ->findBySource($source, $this->getNumberOfArticles(), $this->getFilterDate());

        return $this->render('tech/index.html.twig', [
            'items' => $items,
            'date' => $this->getFilterDate()
        ]);
    }

    public function searchFormAction()
    {
        $form = $this->createForm(new SearchType(),
            array(
                'action' => $this->generateUrl('search'),
                'method' => 'POST',
            )
        );

        return $this->render('search/_form.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/pretraga", name="tech_search")
     * @Method({"GET", "POST"})
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function searchAction(Request $request)
    {
        $form = $this->createForm(new SearchType(),
            array(
                'action' => $this->generateUrl('search'),
                'method' => 'POST',
            ));

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            $data = $form->getData();
            $search = $data['title'];
            $request->getSession()->set('_search', $search);

            $items = $this->get('doctrine_mongodb')
                ->getRepository('AppBundle:Article')
                ->findByTitle($this->getSearchQuery(), $this->getNumberOfArticles(), $this->getFilterDate());

            return $this->render('tech/search.html.twig', [
                'items' => $items,
                'search' => $search
            ]);
        }

        $items = $this->get('doctrine_mongodb')
            ->getRepository('AppBundle:Article')
            ->findByTitle($this->getSearchQuery(), $this->getNumberOfArticles(), $this->getFilterDate());

        return $this->render('tech/search.html.twig', [
            'items' => $items,
            'search' => $this->getSearchQuery()
        ]);
    }

    public function dateFormAction()
    {
        $form = $this->createForm(new TimeType(),
            array(
                'action' => $this->generateUrl('date'),
                'method' => 'POST',
            )
        );

        return $this->render('search/_date.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}
